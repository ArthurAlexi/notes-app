import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void
}

let speechRecognition : SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {

    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [content, setContent] = useState('')
    const [isRecording, setIsRecording] = useState(false)

    function handleStartEditor() {
        setShouldShowOnboarding(false)
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)
        if (event.target.value === '')
            setShouldShowOnboarding(true)
    }

    function handleStartRecord() {
        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
        if(!isSpeechRecognitionAPIAvailable){
            alert("Unfortunately, your browser does not support Speech Recognition")
            return
        }

        setIsRecording(true)
        setShouldShowOnboarding(false)

        const speechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
        speechRecognition = new speechRecognitionAPI()

        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true

        speechRecognition.onresult = (event)=> {
            const transcription = Array.from(event.results).reduce((text, result)=> {
                return text.concat(result[0].transcript) 
            }, '')
            setContent(transcription)
        }

        speechRecognition.onerror = (event) => {
            console.error(event)
        }

        speechRecognition.start
    }

    function handleStopRecord() {
        setIsRecording(false)
        if(speechRecognition !== null){
            speechRecognition.stop()
        }
    }

    function handleSaveNote(event: FormEvent) {
        event.preventDefault()

        if(content === '') return;

        onNoteCreated(content)
        setContent('')
        setShouldShowOnboarding(true)
        toast.success('note created successfully')
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="flex flex-col gap-3 text-left rounded-md bg-slate-700 p-5 overflow-hidden outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">

                <span className='text-sm font-medium text-slate-200'>
                    Note
                </span>
                <p className='text-sm leading-6 text-slate-400'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint repellat fugit accusantium placeat vel sit
                    labore odit dolor ut perspiciatis? Alias omnis assumenda quisquam sit voluptates voluptatum ratione, nam eum.
                </p>

            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50' />
                <Dialog.Content
                    className='flex flex-col outline-none overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md'>
                    <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 outline-none hover:text-slate-100  focus-visible:ring-2 focus-visible:ring-lime-400'>
                        <X className='size-5' />
                    </Dialog.Close>
                    <form className='flex-1 flex flex-col'>
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className='text-sm font-medium text-slate-300'>
                                Add note...
                            </span>
                            <p className='text-sm leading-6 text-slate-400'>
                                {
                                    shouldShowOnboarding ?
                                        (
                                            <p className='text-sm leading-6 text-slate-400'>
                                                Start by <button onClick={handleStartRecord} className='font-medium text-lime-400 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:rounded-sm'>recording an audio</button> or if you prefer,
                                                <button onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:rounded-sm'>just use text</button>
                                            </p>
                                        ) : (
                                            <textarea autoFocus
                                                className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                                                onChange={handleContentChange}
                                                value={content} />
                                        )

                                }

                            </p>
                        </div>

                        {
                            isRecording ? (
                                <button type='button'
                                    onClick={handleStopRecord}
                                    className='flex items-center justify-center gap-2  w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-semibold hover:text-slate-100'>
                                    <div className="size-3 roudend-full bg-red-500 animate-ping" />
                                    Recornding ... (click to stop)
                                </button>
                            ) : (
                                <button type='button'
                                    onClick={handleSaveNote}
                                    className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-semibold hover:bg-lime-700'>
                                    Save note
                                </button>
                            )
                        }


                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    )
}
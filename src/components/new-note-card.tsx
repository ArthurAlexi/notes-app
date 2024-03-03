import * as Dialog from '@radix-ui/react-dialog'

import { X } from 'lucide-react'

export function NewNoteCard() {
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
                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <span className='text-sm font-medium text-slate-300'>
                            Add note...
                        </span>
                        <p className='text-sm leading-6 text-slate-400'>
                            Start by <button className='font-medium text-lime-400 hover:underline'>recording an audio</button> or if you prefer, <button className='font-medium text-lime-400 hover:underline'>just use text</button>
                        </p>
                    </div>
                    <button type='button'
                        className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-semibold hover:bg-lime-700'>
                        Save note
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    )
}
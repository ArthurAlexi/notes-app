import { ChangeEvent, useState } from 'react'
import logo from './assets/logo_notes.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string,
  date: Date,
  content: string
}

export function App() {

  const [seach, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(()=>{
    const noteOnStorage = localStorage.getItem('notes')
    return noteOnStorage ? JSON.parse(noteOnStorage) : []
  })

  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
    const notesArray = [newNote, ...notes]  
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const keySearch = event.target.value
    setSearch(keySearch)
  }

  const filteredNotes = seach !== '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(seach)) : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} className='w-[125px] h-[50px]' alt='Notes app' />
      <form className='w-full'>
        <input placeholder='Search in your notes...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none' 
          onChange={handleSearch}
          value={seach}/>
      </form>
      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6 space-x-3'>
        <NewNoteCard  onNoteCreated={onNoteCreated}/>
        {
          filteredNotes.map((note) => <NoteCard key={note.id} note={note} />)
        }
      </div>
    </div>
  )
}



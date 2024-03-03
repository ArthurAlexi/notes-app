import logo from './assets/logo_notes.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

export function App() {

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} className='w-[125px] h-[50px]' alt='Notes app' />
      <form className='w-full'>
        <input placeholder='Search in your notes...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none' />
      </form>
      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6 space-x-3'>
        <NewNoteCard />
        <NoteCard note={{date: new Date, content: 'Hello World'}} />
      </div>
    </div>
  )
}



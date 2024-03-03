export function NoteCard() {
    return (
        <>
            <div className="rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative">
                <span className='text-sm font-medium text-slate-300'>
                    3 days ago
                </span>
                <p className='text-sm leading-6 text-slate-400'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint repellat fugit accusantium placeat vel sit
                    labore odit dolor ut perspiciatis? Alias omnis assumenda quisquam sit voluptates voluptatum ratione, nam eum.
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 w-full bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
            </div>
        </>
    )
}
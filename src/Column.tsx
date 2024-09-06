import { useState } from 'react';
import './Column.css';
import Data, { NoteData } from './Data';


export type ColumnData = {
	title: string;
	id: string;
	notes: NoteData[];
}

type Props = {title: string; id: string, notes: NoteData[]};

function Column({title, id, notes}: Props) {		
		const [targeted, setTargeted] = useState<number | null>(null);

		const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'move';
			compute(e);
		}

		const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			setTargeted(null);
		}

		const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			compute(e);


			console.log(e.currentTarget.childNodes)
		}

		const compute = (e: React.DragEvent<HTMLDivElement>) => {
			const rec = e.currentTarget.getBoundingClientRect();
			const y = e.clientY - rec.top;
			console.log("Current y", y)
			e.currentTarget.childNodes.forEach((child, index) => {
				if (child instanceof HTMLElement) {
					const childRec = child.getBoundingClientRect();
					
					if (y < childRec.height / 2) setTargeted(index - 1);
					
					if (y > childRec.height / 2 && childRec.bottom < y) setTargeted(index);					
				}
			});
		}

		const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();

			const relatedTarget = e.relatedTarget as HTMLElement | null;

			if (relatedTarget && !e.currentTarget.contains(relatedTarget)) {
				setTargeted(null);
			}
		}

		return (
				<div  data-id={id} className="column">
					<div className="column-header">{title}</div>
					<div className='column-droppable' onDragOver={handleDragOver} onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
						{ targeted === -1 && <div className="placeholder">Drop here</div> }
						{
							notes.map((note, index) => 
							<div key={index}>
								<Data name={note.title} text={note.text} id={note.id} />
								{targeted === index && <div className="placeholder">Drop here</div>}
							</div>
						)}
					</div>
				</div>
		);
}

export default Column;
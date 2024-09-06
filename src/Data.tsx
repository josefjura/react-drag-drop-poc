import { useState } from 'react';
import './Data.css'

export type NoteData = {
	title: string;
	text: string;
	id: number;
}

type Props = {
	id: number;
	text: string;
	name: string
}

function Data({text, name, id}: Props) {
		const [visible, setVisible] = useState(true);

		const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
			console.log('dragging');
			let ghostElement = document.createElement('div');
			let header = document.createElement('div');
			header.style.backgroundColor = 'yellow';
			header.style.padding = '1px';
			header.textContent = name;
			ghostElement.appendChild(header);
			ghostElement.style.width = '300px';
			ghostElement.style.height = '50px';
			ghostElement.style.backgroundColor = 'pink';
			ghostElement.style.cursor = 'default';
			
			document.body.appendChild(ghostElement);
			e.dataTransfer.setDragImage(ghostElement, 50, 25);
			e.dataTransfer.setData('text/plain', id.toString());
			e.dataTransfer.effectAllowed = 'move'
			
			// Make the dragged element invisible
			setTimeout(() => {
				setVisible(false);
				document.body.removeChild(ghostElement);
			}, 0);			
		}

		const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
			console.log('drag end');
			setVisible(true);
		}

		const skip = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
		}

		return (
				<div draggable 
					onDragStart={dragStart}
					onDragEnd={dragEnd}
					onDragEnter={skip}
					onDragLeave={skip}
					onDragOver={skip}
					className={"note" + (visible ? "" : " hidden")}
					data-id={id}>
						<div className="note-header">
							<div>{name}</div>
							<div className="note-buttons">								
								<div>Close</div>
							</div>
						</div>
						<div className="note-text">{text}</div>
				</div>
		)
}

export default Data;
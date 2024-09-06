import { useState } from 'react';
import './Board.css'
import Column, { ColumnData } from "./Column";





function Board() {
		const [columns, setColumns] = useState<ColumnData[]>([
			{ 
				id: 'todo', title: 'To Do', notes: [
				{ id:1, title: 'Test 1', text: 'This is some text' }, 
				{ id:2, title: 'Test 2', text: 'This is some text' }, 
				{ id:3, title: 'Test 3', text: 'This is some text' }] 
			},
			{ 
				id: 'in-progress', title: 'In Progress', notes: [
				{ id:4, title: 'Test 4', text: 'This is some text' }, 
				{ id:5, title: 'Test 5', text: 'This is some text' }, 
				{ id:6, title: 'Test 6', text: 'This is some text' }] 
			},
			{ 
				id: 'done', title: 'Done', notes: [
				{ id:7, title: 'Test 7', text: 'This is some text' }, 
				{ id:8, title: 'Test 8', text: 'This is some text' }, 
				{ id:9, title: 'Test 9', text: 'This is some text' }] 
			},
			{ 
				id: 'info', title: 'Information', notes: [
				{ id:10, title: 'Test 8', text: 'This is some text' }, 
				{ id:11, title: 'Test 9', text: 'This is some text' }, 
				{ id:12, title: 'Test 10', text: 'This is some text' }] 
			},
		]);

		return (
				<div className="main-container">
						{columns.map((column) => <Column key={column.id} title={column.title} id={column.id} notes={column.notes} />)}						
				</div>
		)
}

export default Board;
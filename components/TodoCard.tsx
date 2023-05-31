'use client';
import { useState, useEffect } from 'react';
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useBoardStore } from '@/store/BoardStore';
import Image from 'next/image';
import getUrl from '@/utils/getUrl';

type Props = {
	todo: Todo;
	index: number;
	id: TypedColumn;
	innerRef: (element: HTMLElement | null) => void;
	draggableProps: DraggableProvidedDraggableProps;
	dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export const TodoCard = ({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const deleteTask = useBoardStore((state) => state.deleteTask);

	useEffect(() => {
		if (todo.image) {
			const fetchImage = async () => {
				const url = await getUrl(todo.image!);
				if (url) {
					setImageUrl(url.toString());
				}
			};
			fetchImage();
		}
	}, [todo]);
	return (
		<div className={'bg-white rounded-md space-y-2 drop-shadow-md'} {...draggableProps} {...dragHandleProps} ref={innerRef}>
			<div className={'flex items-center justify-between p-5'}>
				<p>{todo.title}</p>
				<button onClick={() => deleteTask(index, todo, id)} className={'text-red-500 hover:text-red-600'}>
					<XCircleIcon className={'ml-5 h-8 w-8'} />
				</button>
			</div>
			{imageUrl && (
				<div className="relative h-full w-full rounded-b-md">
					<Image src={imageUrl} alt="Task image" width={400} height={200} className="w-full object-contain rounded-b-md" />
				</div>
			)}
		</div>
	);
};

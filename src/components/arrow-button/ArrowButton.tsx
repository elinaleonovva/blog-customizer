import clsx from 'clsx';
import arrow from '../../../src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	onClick: () => void;
	isOpen: boolean;
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === ' ') {
			event.preventDefault();
			onClick();
		}
	};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={onClick}
			onKeyDown={handleKeyDown}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};

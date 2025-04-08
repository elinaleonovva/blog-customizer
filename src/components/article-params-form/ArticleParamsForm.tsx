import { ArrowButton } from '../../components/arrow-button';
import { Button } from '../../components/button';

import styles from './ArticleParamsForm.module.scss';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Select } from '../select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from '../../../src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Spacing } from '../spacing';

interface ArticleParamsFormProps {
	setArticleState: (
		value: ArticleStateType | ((prev: ArticleStateType) => ArticleStateType)
	) => void;
}

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);

	const toggle = () => {
		if (isOpen) setIsOpen(false);
		else setIsOpen(true);
	};

	const handleEscKey = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
			// console.log('я закрылся');
		}
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
			// console.log('я закрылся');
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleEscKey);
			document.addEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('keydown', handleEscKey);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
		setIsOpen(false);
	};

	const onReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setArticleState({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Select
						title='Шрифт'
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={setFontFamily}
					/>
					<Spacing size={50} />
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
						title='Размер шрифта'
					/>
					<Spacing size={50} />
					<Select
						title='Цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						title='Цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
					/>
					<Spacing size={50} />
					<Select
						title='Ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

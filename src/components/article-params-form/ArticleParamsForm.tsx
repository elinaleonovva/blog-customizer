import styles from './ArticleParamsForm.module.scss';

import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Text } from '../text';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const formRef = useRef<HTMLDivElement | null>(null);
	const [currentFontFamily, setCurrentFontFamily] = useState(
		currentArticleState.fontFamilyOption
	);
	const [currentFontSize, setCurrentFontSize] = useState(
		currentArticleState.fontSizeOption
	);
	const [currentFontColor, setCurrentFontColor] = useState(
		currentArticleState.fontColor
	);
	const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
		currentArticleState.backgroundColor
	);
	const [currentContentWidthArr, setCurrentContentWidthArr] = useState(
		currentArticleState.contentWidth
	);

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		const formState = {
			fontFamilyOption: currentFontFamily,
			fontSizeOption: currentFontSize,
			fontColor: currentFontColor,
			backgroundColor: currentBackgroundColor,
			contentWidth: currentContentWidthArr,
		};
		e.preventDefault();
		setCurrentArticleState(formState);
	};

	const handleFormReset = () => {
		setCurrentFontFamily(defaultArticleState.fontFamilyOption);
		setCurrentFontSize(defaultArticleState.fontSizeOption);
		setCurrentFontColor(defaultArticleState.fontColor);
		setCurrentBackgroundColor(defaultArticleState.backgroundColor);
		setCurrentContentWidthArr(defaultArticleState.contentWidth);
		setCurrentArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} setIsOpen={() => setIsMenuOpen(!isMenuOpen)} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={currentFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={setCurrentFontFamily}
					/>
					<RadioGroup
						name='18px'
						title='размер шрифта'
						selected={currentFontSize}
						options={fontSizeOptions}
						onChange={setCurrentFontSize}
					/>
					<Select
						selected={currentFontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={setCurrentFontColor}
					/>
					<Separator />
					<Select
						selected={currentBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={setCurrentBackgroundColor}
					/>
					<Select
						selected={currentContentWidthArr}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setCurrentContentWidthArr}
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

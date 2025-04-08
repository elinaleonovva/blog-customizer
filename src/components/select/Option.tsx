import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from '../../../src/constants/articleProps';
import { Text } from '../../components/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
	selectedValue: OptionType['value'];
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
		selectedValue,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick: MouseEventHandler<HTMLLIElement> = () => {
		onClick(value);
	};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === ' ') {
			event.preventDefault();
			onClick(value);
		}
	};

	const isSelected = selectedValue === value;

	return (
		<li
			role='option'
			aria-label={`Выбрать ${value}`}
			aria-selected={isSelected}
			className={clsx(styles.option, styles[optionClassName || ''])}
			value={value}
			onClick={handleClick}
			tabIndex={0}
			onKeyDown={handleKeyDown}
			data-testid={`select-option-${value}`}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};

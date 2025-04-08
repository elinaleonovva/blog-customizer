import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
	isUnavailable?: boolean;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
		isUnavailable,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue);
		};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''], isUnavailable && styles.unavailable )}
			value={value}
			onClick={handleClick(value)}
			tabIndex={0}
			data-testid={`select-option-${value}`}
			ref={optionRef}>

			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};

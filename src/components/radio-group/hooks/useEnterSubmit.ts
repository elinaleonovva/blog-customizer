import { useEffect } from 'react';
import { OptionType } from '../../../../src/constants/articleProps';

type UseEnterSubmit = {
	optionRef: React.RefObject<HTMLElement>;
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const useEnterSubmit = ({
	optionRef,
	onChange,
	option,
}: UseEnterSubmit) => {
	useEffect(() => {
		const optionHtml = optionRef.current;

		if (!optionHtml) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === optionHtml && event.key === 'Enter') {
				onChange?.(option);
			}
		};

		optionHtml.addEventListener('keydown', handleEnterKeyDown);

		// не забываем удалять листенеры, при размонтировании компонента
		return () => {
			optionHtml.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [optionRef, onChange, option]);
};

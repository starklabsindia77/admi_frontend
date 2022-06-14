import * as React from 'react';

function SvgEasel2(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path
				fillRule='evenodd'
				d='M8 0a.5.5 0 01.447.276L8.81 1h4.69A1.5 1.5 0 0115 2.5V11h.5a.5.5 0 010 1h-2.86l.845 3.379a.5.5 0 01-.97.242L12.11 14H3.89l-.405 1.621a.5.5 0 01-.97-.242L3.36 12H.5a.5.5 0 010-1H1V2.5A1.5 1.5 0 012.5 1h4.691l.362-.724A.5.5 0 018 0zM2 11h12V2.5a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5V11zm9.61 1H4.39l-.25 1h7.72l-.25-1z'
			/>
		</svg>
	);
}

export default SvgEasel2;

import * as React from 'react';

function SvgFilePpt(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path d='M2 2a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm10-1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1z' />
			<path d='M6 5a1 1 0 011-1h1.188a2.75 2.75 0 010 5.5H7v2a.5.5 0 01-1 0V5zm1 3.5h1.188a1.75 1.75 0 100-3.5H7v3.5z' />
		</svg>
	);
}

export default SvgFilePpt;

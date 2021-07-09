import { Dropdown } from "@fluentui/react";

type ComponentProps = {
	dialogTitle: string;
    dialogText: string;
    secondButtonText: string;
    btnAction: () => void;

}

const DialogHelper : React.FC<ComponentProps> = ({dialogTitle, dialogText, secondButtonText, btnAction, children}) =>  {
    const cancelDialog = () => {
		let element = document.getElementsByClassName("modal");
		element[0].setAttribute("style", "display:none");
	};
    
    return (<>
        <div className='modal' role='dialog'>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title'>{dialogTitle}</h5>
							</div>
							<div className='modal-body'>
								<div>{dialogText}</div>
								{children}
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-secondary'
									data-dismiss='modal'
									onClick={cancelDialog}
								>
									Zatvori
								</button>
								<button
									type='button'
									className='btn btn-primary'
									onClick={btnAction}
								>
									{secondButtonText}
								</button>
							</div>
						</div>
					</div>
				</div>
    </>);
}

export default DialogHelper;
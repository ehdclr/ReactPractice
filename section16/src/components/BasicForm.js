import useInput from "../hooks/use-input";

const BasicForm = (props) => {
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput,
    } = useInput(value => value.trim() !== "");
    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput,
    } = useInput(value => value.trim() !== "");
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput(value => value.includes("@"));


    let formIsValid = false;

    if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();

        if (!enteredFirstNameIsValid || !enteredFirstNameIsValid || !enteredEmailIsValid) {
            return;
        }
        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
    }

    const firstInputClasses = firstNameInputHasError ? "from-control invalid" : "form-control";
    const lastInputClasses = lastNameInputHasError ? "from-control invalid" : "form-control";
    const emailInputClasses = emailInputHasError ? "from-control invalid" : "form-control";


    return (
        <form onSubmit={formSubmissionHandler}>
            <div className='control-group'>
                <div className={firstInputClasses}>
                    <label htmlFor='name'>First Name</label>
                    <input type='text' id='name' onChange={firstNameChangeHandler} value={enteredFirstName}
                           onBlur={firstNameBlurHandler}/>
                    {firstNameInputHasError && <p className="error-text">Name must not be empty!</p>}
                </div>
                <div className={lastInputClasses}>
                    <label htmlFor='name'>Last Name</label>
                    <input type='text' id='name' onChange={lastNameChangeHandler} value={enteredLastName}
                           onBlur={lastNameBlurHandler}/>
                    {lastNameInputHasError && <p className="error-text">Name must not be empty!</p>}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>E-Mail Address</label>
                <input type='email' id='email' onChange={emailChangeHandler} value={enteredEmail}
                       onBlur={emailBlurHandler}/>
                {emailInputHasError && <p className="error-text">email must includes @!</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;

interface FormInputProps {
    id: string;
    className?: string;
    required?: boolean;
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
    label_text?: string;
    type: string;
    value?: string;
    error?: string;
}

const FormInput = (props: FormInputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={props.id} className="flex flex-row gap-1">
                {props.label_text}
                {props.required && <span className="text-red-600">*</span>}
            </label>
            <input
                required={props.required}
                type={props.type}
                id={props.id}
                onChange={props.onChange}
                className={
                    props.className
                        ? props.className
                        : "bg-[#0A0A0A] border-2 border-[#1C1C1C] h-12 rounded-lg px-3"
                }
                value={props.value}
            />
            {props.error && (
                <div className="text-red-500 text-xs">{props.error}</div>
            )}
        </div>
    );
};

export default FormInput;

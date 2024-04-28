import { IoMdAddCircleOutline } from "react-icons/io";

interface Props {
    onClick: () => void;
    title: string;
}

export const AddButon = ({onClick, title}: Props) => {
    return (
        <button onClick={onClick} className="w-full lg:w-auto flex justify-center items-center gap-2 p-3 bg-green-100 rounded-xl border-2">
                <span className="text-green-600">{title}</span>
                <IoMdAddCircleOutline className="text-green-600"/>
        </button>
    )
}

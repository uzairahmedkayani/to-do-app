import React from "react";

export default function Note(props) {
const handleCheck = () => {
    if (props.onCheck) {
        props.onCheck(props.id);
    }
};

const handleDelete = (e) => {
    e.stopPropagation();
    if (props.onDelete) {
        props.onDelete(props.id);
    }
};

return (
    <>
        <div
            className="flex items-center justify-between p-3 rounded group cursor-pointer"
            onClick={e => {
                // Prevent checking when clicking on icons
                if (
                    e.target.closest(".note-action-icon") ||
                    e.target.type === "checkbox"
                ) return;
                handleCheck();
            }}
        >
            <div className="flex items-center flex-1">
                <input
                    type="checkbox"
                    className="form-checkbox rounded-sm border-2 border-purple-500 text-purple-600 focus:ring-purple-500 h-5 w-5"
                    id={`note${props.id}`}
                    checked={props.checked}
                    onChange={handleCheck}
                />
                <label
                    htmlFor={`note${props.id}`}
                    className="ml-3 text-gray-800 font-medium cursor-pointer select-none"
                >
                    {props.text}
                </label>
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition">
                <span className="note-action-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 hover:text-purple-600 cursor-pointer"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                </span>
                <span className="note-action-icon" onClick={handleDelete}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 hover:text-red-600 cursor-pointer"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                </span>
            </div>
        </div>
        <hr className="border-gray-400 mb-2" />
    </>
);
}

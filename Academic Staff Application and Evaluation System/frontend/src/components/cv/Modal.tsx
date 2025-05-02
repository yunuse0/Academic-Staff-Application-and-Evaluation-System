
import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl relative my-10 mx-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                    <X size={20} />
                </button>
                {title && (
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h2>
                )}
                <div className="max-h-[70vh] overflow-y-auto pr-2">
                    {children}
                </div>
            </div>
        </div>
    );
}
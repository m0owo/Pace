const IconButton = ({icon, todo, text}) => {
    return(
        <button className="flex flex-row flex-nowrap p-2 
                           justify-start gap-2 hover:bg-gray-800
                           transition-all" 
                onClick={todo}
        >
            {icon}
            {text}
        </button>
    );
};

export default IconButton

import { useState } from "react";

function Accordion(){

    const[isOpen, setOpen] = useState(false);

    return(
        <div className="accordion">
           {isOpen && (
            <div>
                <p>

                </p>
            </div>
           ) }

        </div>
    );
}
export default Accordion;
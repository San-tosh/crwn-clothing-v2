import './directories.styles.scss'
import DirectoryItem from "../directory-item/directory-item.component";

const Directories = ({categories})=>{
    return (
        <div className="categories-container">
            {
                categories.map((category)=>{
                    return <DirectoryItem key={category.id} category={category}/>
                })
            }
        </div>
    )
}

export default Directories
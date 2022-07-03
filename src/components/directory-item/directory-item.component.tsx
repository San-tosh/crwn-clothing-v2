import { useNavigate } from 'react-router-dom';

import {
    BackgroundImage,
    DirectoryItemBody,
    DirectoryItemContainer,
} from './directory-item.styles';

export type DirectoryItemProps = {
    category: {
        title: string,
        imageUrl: string,
        route: string,
        id: number
    }
}

const DirectoryItem = ({ category } : DirectoryItemProps) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <DirectoryItemBody>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryItemBody>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
import React, {PropsWithChildren} from 'react';

const PageLayout = ({children}: PropsWithChildren) => {
    return (
        <div className={'w-5/6 pt-4'}>
            {children}
        </div>
    );
};

export default PageLayout;

import React, { useState, useEffect } from 'react';
import CanvasComponent from '@/components/CanvasComponent';

function bookShelf() {
    return (
        <div>
            <h1>책장 관리하기</h1>
            <CanvasComponent
                bookshelf={[
                    { id: 1, positionX: null, positionY: null, width: 10, height: 20 },
                    { id: 2, positionX: null, positionY: null, width: 10, height: 20 },
                    { id: 3, positionX: null, positionY: null, width: 10, height: 20 },
                ]}
                library={[
                    { id: 4, positionX: 10, positionY: 10, width: 10, height: 20 },
                ]}
            />
        </div>
    );
}

export default bookShelf;
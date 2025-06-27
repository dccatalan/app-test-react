import React, {useEffect, useRef, useState} from 'react';
import { Galleria } from 'primereact/galleria';
import photo1 from '../../assets/gallery/photo1.jpeg'
import photo2 from '../../assets/gallery/photo2.jpeg'
import photo3 from '../../assets/gallery/photo3.jpeg'
import photo4 from '../../assets/gallery/photo4.jpeg'
import photo5 from '../../assets/gallery/photo5.jpeg'
import photo6 from '../../assets/gallery/photo6.jpeg'
import photo7 from '../../assets/gallery/photo7.jpeg'
import photo8 from '../../assets/gallery/photo8.jpeg'
import photo9 from '../../assets/gallery/photo9.jpeg'
import photo10 from '../../assets/gallery/photo10.jpeg'
import photo11 from '../../assets/gallery/photo11.jpeg'
import photo12 from '../../assets/gallery/photo12.jpeg'
import photo13 from '../../assets/gallery/photo13.jpg'
import photo14 from '../../assets/gallery/photo14.jpg'
import photo15 from '../../assets/gallery/photo15.jpg'
import photo16 from '../../assets/gallery/photo16.jpg'


export const SectionGallery = () => {
    const galleria3 = useRef(null);
    const [images, setImages] = useState(null);
    
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];


    const [activeIndex, setActiveIndex] = useState(0);
    const itemTemplate = (item) => {
        return <img src={item}
                    onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                    alt={item.alt} style={{width: '100%', display: 'block'}}/>;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item}
                    onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                    alt={item.alt} style={{display: 'block'}}/>;
    }

    useEffect(() => {
        setImages([photo1,photo2,photo3,photo4,photo5,photo6,photo7,photo8,photo9,photo10,photo11,photo12,photo13,photo14,photo15,photo16])
    }, [])
    return (
        <div>
            { /* Galería */}
           <div id="gallery" className="surface-section px-4 py-8 md:px-6 lg:px-8 border-top-1 surface-border">
                <div>
                    <div className="card">
                        <h2 className="mb-3 font-bold text-4xl text-900">Galería</h2>
                        <div className="text-center text-xl line-height-3 text-600 mb-6">El exito consiste en cuidar cada detalle, todos los trabajos son inspeccionados y verificados, <span className="text-900 font-bold"> nada queda al azar </span>.</div>
                        <Galleria ref={galleria3} value={images} responsiveOptions={responsiveOptions}
                                  numVisible={7} style={{maxWidth: '700px'}}
                                  activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
                                  circular fullScreen showItemNavigators showThumbnails={false}
                                  item={itemTemplate} thumbnail={thumbnailTemplate}/>

                        <div className="grid">
                            {
                                images && images.map((image, index) => {
                                    let imgEl = <img src={image} className="w-full border-round" width={200} height={170}
                                                     onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                                                     alt={image.alt} style={{cursor: 'pointer'}} onClick={
                                        () => {
                                            setActiveIndex(index);
                                            galleria3.current.show()
                                        }
                                    }/>
                                    return (
                                        <div className="col-12 md:col-6 lg:col-3 mb-5 lg:mb-0">
                                            <div className="mb-3 relative">
                                                {imgEl}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

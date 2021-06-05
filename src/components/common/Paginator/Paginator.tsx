import React, {useState} from 'react'
import styles from './Paginator.module.css'

type PaginatorPropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

const Paginator: React.FC<PaginatorPropsType> = ({totalItemsCount,pageSize, currentPage,onPageChanged, portionSize}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNUmber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNUmber = portionNumber * portionSize

    return <div className={styles.paginator}>
        {portionNumber > 1 && <button className={styles.prevButton} onClick={()=>{setPortionNumber(portionNumber - 1)}}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNUmber && p <= rightPortionPageNUmber)
                .map(p => {
                return <span className={currentPage === p ? styles.pageNumber : styles.selectedPage}
                             onClick={() => {onPageChanged(p)}}>{p}</span>
            })}
        {portionCount > portionNumber && <button className={styles.nextButton} onClick={()=>{setPortionNumber(portionNumber + 1)}}>NEXT</button>}
        </div>

}


export default Paginator
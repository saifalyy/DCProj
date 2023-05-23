import {GridLoader} from 'react-spinners'
import {css} from '@emotion/react'

const style = {
    wrapper: ``,
    title: `font-semibold text-xl mb-6`,
}

const cssOverride = css`
    display: black;
    margin: 0 auto;
    border-color: white;
`

const LoadingState = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.title}>Minting in progress...</div>
            <GridLoader color={'#fff'} loading={true} css={cssOverride} size={30} />
        </div>
    )
}

export default LoadingState
import {GiEarthAmerica} from 'react-icons/gi'

const style = {
    wrapper: ``,
    inputFieldContainer: `flex-1`,
    inputContainer: `mb-4`,
    fileInput: `hidden`,
    input: `bg-transparent outline-none text-xl w-full`,
    customInput: ``,
    fileSelected: ``,
    lower: `flex justify-between items-center`,
    visibility: `flex items-center text-[#1d9bf0] text-sm font-bold`,
    visibilityText: `ml-2`,
    mintbutton: ``,
    inactiveMintButton: `text-black px-3 py-1 rounded-full bg-[#8899a6],`
}

const initialState = ({
    profileImage,
    setProfileImage,
    name,
    setName,
    description,
    setDescription,
    mint,
}) => {
    console.log(profileImage)
    return (
        <div className={style.wrapper}>
            <div className={style.inputFieldContainer}>
                <div className={style.inputContainer}>
                    <label
                        htmlFor="image-upload"
                        className={profileImage ? style.fileSelected : style.customInput}
                    ></label>
                    <input
                        type='file'
                        id='image-upload'
                        accept='.jpg, .jpeg, .png'
                        className={style.fileInput}
                        placeholder='Image URL'
                        onChange={e => setProfileImage(e.target.files[0])}
                    />
                </div>
                <div className={style.inputContainer}>
                    <input
                        type='text'
                        className={style.input}
                        placeholder='Title of Image'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={style.inputContainer}>
                    <input
                        type="text"
                        className={style.input}
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
            <div className={style.lower}>
                <div className={style.visibilityText}>
                    <GiEarthAmerica />
                    <span className={style.visibilityText}>Everyone can see this</span>
                </div>
                <div className={
                    name && description && profileImage
                    ? style.mintbutton
                    : style.inactiveMintButton
                }
                onClick={() => {
                    if (name && description && profileImage) {
                        mint()
                    }
                }}
                >
                    Mint
                </div>
            </div>
        </div>
    )
}

export default initialState;
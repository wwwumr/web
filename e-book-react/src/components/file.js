import React from 'react'

class UpFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            introdction: '',
        }
    }

    render() {
        return (
            <div>
            <form action="http://localhost:8081/upload" method="post" enctype="multipart/form-data">
                <input type="file" name='file'/>
                <input type="submit" value="上传"/>
            </form>
            </div>
        )
    }
}

export default UpFile;
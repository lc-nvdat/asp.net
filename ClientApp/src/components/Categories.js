import React from 'react'
import CategoryForm from './CategoryForm';

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            showForm:false
        }
        this.reload = this.reload.bind(this);
    }
    componentDidMount() {
        if (window.sessionStorage.getItem("categories") !== null) {
            const categories = JSON.parse(window.sessionStorage.getItem("categories"));
            this.setState({ categories: categories });
        } else {
            fetch("api/categories").then(rs => rs.json()).then(rs => {
                // console.log(rs);
                window.sessionStorage.setItem("categories", JSON.stringify(rs));
                this.setState({ categories: rs });
            })
        } 
       
    }
    reload() {
        fetch("api/categories").then(rs => rs.json()).then(rs => {
            // console.log(rs);
            this.setState({ categories: rs });
        })
    }
    render() {
        const categories = this.state.categories;
        const showForm = this.state.showForm;
        return (
            showForm ? <CategoryForm onReload={this.reload} onBack={() => { this.setState({ showForm: false }); }} /> :
            <div>
                    <h1>Category Listing</h1>
                    <button className="btn btn-primary" onClick={() => this.setState({ showForm:true })}>New Category</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Icon</th>  
                            <th>Action</th>  
                        </tr>  
                    </thead>
                    <tbody>
                        {
                            categories.map((e, i) => {
                                return (<tr key={ i}>
                                            <td>{ e.id }</td>   
                                            <td>{ e.name }</td>   
                                    <td><img src={e.icon} width="100"/></td>
                                    <td><button type="button" className="btn btn-default">Edit</button></td>
                                        </tr>)
                            })
                        }    
                    </tbody>
                </table>
            </div>
        );
    }
}
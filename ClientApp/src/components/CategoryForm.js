import React from 'react';
import { post } from 'jquery';

export default class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                Name: "",
                Icon:""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const category = this.state.category;
        const { name, value } = event.target;
        category[name] = value;
        this.setState({ category: category });
    }
    handleSubmit(e) {
        e.preventDefault();
        const category = this.state.category;
        //fetch("api/categories", {method:"post",pa})
        fetch("api/categories", {
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
            },
            method: "post",
        }).then(rs => {
            this.props.onReload();
            alert("Success!");
            this.props.onBack();
        }).catch(err => { console.log(err)});
    }
    render() {
        const category = this.state.category;
        return (<div>
            <form onSubmit={this.handleSubmit }>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="Name" onChange={this.handleChange} value={category.Name} className="form-control" placeholder="Name.." />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="Icon" onChange={this.handleChange} value={category.Icon} className="form-control" placeholder="Icon.." />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" onClick={() => { this.props.onBack();} } className="btn btn-default">Cancel</button>
                </div>
            </form>    
        </div>)
    }
}
import React from 'react';

export default class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                Name: "",
                Image: "",
                Description: "",
                Price: 0,
                CategoryId:0
            },
            categories:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleChange(event) {
        const product = this.state.product;
        const { name, value } = event.target;
        product[name] = name === "Price" || name=== "CategoryId" ? parseInt(value):value;
        this.setState({ product: product });
    }
    handleSubmit(e) {
        e.preventDefault();
        const product = this.state.product;
        //fetch("api/categories", {method:"post",pa})
        fetch("api/products", {
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
            },
            method: "post",
        }).then(rs => {
            this.props.onReload();
            alert("Success!");
            this.props.onBack();
        }).catch(err => { console.log(err) });
    }
    render() {
        const product = this.state.product;
        const categories = this.state.categories;
        return (<div>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="Name" onChange={this.handleChange} value={product.Name} className="form-control" placeholder="Name.." />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" name="Image" onChange={this.handleChange} value={product.Image} className="form-control" placeholder="Icon.." />
                </div>
                <div className="form-group">
                    <label>Desc</label>
                    <input type="text" name="Description" onChange={this.handleChange} value={product.Description} className="form-control" placeholder="Icon.." />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="Price" onChange={this.handleChange} value={product.Price} className="form-control" placeholder="Icon.." />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select name="CategoryId" className="form-control" onChange={this.handleChange}>
                        <option value={0}>Select Category</option>
                        {
                            categories.map((c, ci) => {
                                return <option key={ci} value={c.id}>{c.name}</option>     
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" onClick={() => { this.props.onBack(); }} className="btn btn-default">Cancel</button>
                </div>
            </form>
        </div>)
    }
}
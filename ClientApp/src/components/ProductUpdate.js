import React from 'react';

export default class ProductUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            categories: []
        }
        console.log(props.product);
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
        product[name] = name === "Price" || name === "CategoryId" ? parseInt(value) : value;
        this.setState({ product: product });
    }
    handleSubmit(e) {
        e.preventDefault();
        const product = this.state.product;
        const data = {
            Id: product.id,
            Name: product.name,
            Image: product.image,
            Description: product.description,
            Price: product.price,
            CategoryId: product.categoryId,
        }
        //fetch("api/categories", {method:"post",pa})
        fetch("api/products/" + product.id, {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
            },
            method: "PUT",
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
                    <input type="text" name="name" onChange={this.handleChange} value={product.name} className="form-control" placeholder="Name.." />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" name="image" onChange={this.handleChange} value={product.image} className="form-control" placeholder="Icon.." />
                </div>
                <div className="form-group">
                    <label>Desc</label>
                    <input type="text" name="description" onChange={this.handleChange} value={product.description} className="form-control" placeholder="Icon.." />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" onChange={this.handleChange} value={product.price} className="form-control" placeholder="Icon.." />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select name="categoryId" className="form-control" value={product.categoryId} onChange={this.handleChange}>
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
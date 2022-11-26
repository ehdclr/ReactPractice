import {Component} from "react";
class ErrorBoundary extends Component{
    constructor() {
        super();
        this.state = {hasError:false};
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        this.setState({hasError:true})
    }

    render(){
        if(this.state.hasError){
            return <p>SomeThing went wrong!</p>
        }
        return this.props.children;
        //오류 경계 컴포넌트를 우리가 보호하려고 하는 컴포넌트로 둘러 싸야하기 때문에
    }
}

export default ErrorBoundary;
import { useRecoilState } from 'recoil';
import mainLogo from '../assets/company_logo.png';
import { currentLoggedIn } from '../Database/Database';

const DashboardHelper : React.FC<{text:string}> = ({text}) =>  {

    const [currentLoggedInUser, setCurrentLoggedInUser] = useRecoilState(currentLoggedIn);
    var hrefLink: string;
    if (currentLoggedInUser.isAdmin){
        hrefLink = '/admin';
    }
    else {
        hrefLink = '/employee';
    }
    return (<>
        <div className="row">
            <div className="container col-12 text-center">
                <a href={hrefLink}><img className="logo" src={mainLogo}></img></a>
                <br/>
                <h2>{text}</h2>
                <br/>
            </div>
        </div>
    </>);
}

export default DashboardHelper;
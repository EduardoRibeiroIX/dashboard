import { Link } from 'react-router-dom';
import './footer.css'

// const scrollToTop = () => {
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//     });
// }


const Footer = () => {
    return (
        <footer className="footer">
            <div className="dev">
                <h5>Desenvolvido por <a href="https://github.com/EduardoRibeiroIX/" target="_blank">Eduardo Ribeiro <i className="fa-solid fa-code"></i></a></h5>
                <p>Copyright <i className="fa-regular fa-copyright"></i> EduuIX — Todos os direitos reservados</p>
            </div>
        </footer>
    );
}

export { Footer }
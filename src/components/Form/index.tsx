import { useState }   from 'react';
import style          from './Form.module.css'
import Mimir          from '../../assets/mimirLoading.png'
import axios          from 'axios';
import { FcNext }     from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

interface Repository {
    
  [x: string]: any;
  id:          number;
  name:        string;
  full_name:   string;
}

const RepositoryForm: React.FC = () => {
    
    const [repoTitle, setRepoTitle] = useState('');
    const [repository, setRepository] = useState<Repository | null>(null);
    const [loading, setLoading] = useState<boolean | string | any>(false);
    const [currentPage, setCurrentPage] = useState(1);
  
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        if (!repoTitle) {
          alert('Você não digitou nada!');
          setLoading(false);
          return;
        }
    
        try {
          const response = await axios.get(`https://api.github.com/search/repositories?q=${repoTitle}&page=${currentPage}`);
          const data = response.data;
    
          setRepository(data);
    
          if (data.total_pages) {
            setCurrentPage(data.page);
          }
        } catch (error) {
          console.error('Erro ao buscar repositório:', error);
        } finally {
          setLoading(false);
        }
      };
    
      const goToPage = async (page: number) => {
        setCurrentPage(page);
        setLoading(true);
        window.scrollTo(0, 0);
    
        await handleFormSubmit(new Event('fake-event') as unknown as React.FormEvent);
      };
    

    
  return (

    <main className={style.main}>

      <form onSubmit={handleFormSubmit}>

        <input
          type="text"
          value={repoTitle}
          onChange={(e) => setRepoTitle(e.target.value)}
          placeholder="Digite o título do repositório..."
          className={style.input}
        />

        <button className={style.button} type="submit">Buscar</button>

      </form>

      <section className={style.content}>

        {loading && 

            <div className={style.divLoading}>

                <img 
                     src={Mimir}
                     alt="Carregando"
                     className={style.loading}
                />

                <p>...Carregando...</p>

                <img 
                     src={Mimir}
                     alt="Carregando"
                     className={style.loading}
                />

            </div>
            
        } 

        {repository && (
        <div className={style.divContent}>

            <div className={style.divTitle}>

                <h2 className={style.title}>Repositórios relacionados ao título</h2>

            </div>

            <div className={style.infoRepository}>

                {repository.items.map((item: any, index: number) => (

                    <div className={style.divInfo} key={index}>

                        <p>ID: {item.id}</p>
                        <p>Título do repositório: {item.name}</p>
                        <p>Caminho do repositório: github.com/{item.full_name}</p>
                        <p>Descrição: {item.description}</p>

                    </div>
                ))}
            </div>

            <div className={style.divButton}>

                <button className={style.button} onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    <FcPrevious />Página Anterior
                </button>
                <button className={style.button} onClick={() => goToPage(currentPage + 1)} disabled={currentPage === repository.total_pages}>
                    Próxima Página <FcNext/>
                </button>

            </div>

        
        </div>
        )}

      </section>


    </main>
  );
};

export default RepositoryForm;
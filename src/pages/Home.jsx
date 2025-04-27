import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { getCountries } from '../service/countryApi';
import Loader from '../components/Loader/Loader';
import CountryList from '../components/CountryList/CountryList';

const Home = () => {
  const [countries, setCountries] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const fetchData = async ()=>{
      setIsLoading(true)
      setError(null)
      try {
        const data = await getCountries()
        setCountries(data)
      } catch (error) {
        setError(error)
      }finally{
        setIsLoading(false)
      }
    }
    fetchData()
  },[])


  return (
    <Section>
      <Container>
        {isLoading && <Loader/>}
        {error &&  <Heading title="Oops! Something went wrong..." bottom />}
        {countries.length > 0 && <CountryList countries={countries}/>}
       
      </Container>
    </Section>
  );
};
export default Home;

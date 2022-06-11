const [pedidos, setPedidos] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  try{
    async function loadPedidos() {
      const response = await api.get('/order');
      // console.log(response.data);

      setPedidos(response.data);
      
      setLoading(false);
    }

    loadPedidos();
  }catch (err){
    console.log(err);
  }

},[]);

if ( loading ) {
  return(
    <div className="loading">
      <Loading />
    </div>
  );
}
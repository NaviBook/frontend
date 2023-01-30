export default function Detail({id}) {
  return (
    <div>
        <h1>Detail {id}</h1>
    </div>
  );
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            id: context.params.id,
        },
    };
};
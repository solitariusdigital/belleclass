import dbConnect from "@/services/dbConnect";
import doctorModel from "@/models/Doctor";

export default function Doctor({ doctor }) {
  return (
    <div>
      <p>{doctor.name}</p>
      <p>{doctor.bio}</p>
    </div>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    let id = context.params.doctor;
    const doctor = await doctorModel.findById(id);

    return {
      props: {
        doctor: JSON.parse(JSON.stringify(doctor)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

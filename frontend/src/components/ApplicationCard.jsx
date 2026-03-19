export default function ApplicationCard({ app }) {
  return (
    <div className="border p-4 rounded mb-3 flex justify-between items-center">

      <div>
        <h3 className="font-semibold">{app.company}</h3>
        <p className="text-sm text-gray-500">{app.role}</p>
      </div>

      <div>
        <span className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600">
          {app.status}
        </span>
      </div>

    </div>
  );
}
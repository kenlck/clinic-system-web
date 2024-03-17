export default function Page() {
  return (
    <div>
      <div>
        <h1>Patients</h1>
      </div>

      <div className="space-y-2">
        {Array.from({ length: 1000 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div>
              <h2>User {i + 1}</h2>
              <p>user-{i + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const getPerson = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(person => person.name === name) || null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = getPerson(person.motherName);
          const father = getPerson(person.fatherName);

          return (
            <tr
              data-cy="person"
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>{mother ? <PersonLink person={mother} /> : '-'}</td>

              <td>{father ? <PersonLink person={father} /> : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

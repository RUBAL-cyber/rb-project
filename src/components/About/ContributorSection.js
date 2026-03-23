import React, { useEffect, useState } from 'react';

const ContributorSection = () => {
  const [contributors, setContributors] = useState([]);
  const owner = 'Mannu1447';
  const repoName = 'rb-project';

  useEffect(() => {
    const fetchContributors = async (pageNumber) => {
      const perPage = 100;
      const url = `https://api.github.com/repos/${owner}/${repoName}/contributors?page=${pageNumber}&per_page=${perPage}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch contributors data. Status code: ${response.status}`);
      }

      const contributorsData = await response.json();
      return contributorsData;
    };

    const fetchAllContributors = async () => {
      let allContributors = [];
      let pageNumber = 1;

      try {
        while (true) {
          const contributorsData = await fetchContributors(pageNumber);
          if (contributorsData.length === 0) {
            break;
          }
          allContributors = allContributors.concat(contributorsData);
          pageNumber++;
        }

        // Filter out owner and set state
        const filteredContributors = allContributors.filter(contributor => contributor.login !== owner);
        setContributors(filteredContributors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllContributors();
  }, []);

  return (
    <div id="contributor" className='fade-effect'>
      {contributors.map(contributor => (
        <div key={contributor.id} className="contributor-card">
          <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
            <img
              src={contributor.avatar_url}
              alt={`${contributor.login}'s avatar`}
              style={{ width: '105px', height: '105px' }}
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContributorSection;
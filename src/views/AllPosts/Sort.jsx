import React, { useMemo, useState } from 'react';
import TopicRow from '../../components/CategoryView/TopicRow/TopicRow';
import { Grid } from '@mui/material';

import './Sort.css';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const Sort = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.posts);
  const search = props.search;

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table>
      <thead>
        <tr>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort('title')}
                className={getClassNamesFor('title')}
                style={{ backgroundColor: '#0fc0fc' }}
              >
                Title
              </button>
            </th>

            <th>
              <button
                type="button"
                onClick={() => requestSort('createdOn')}
                className={getClassNamesFor('createdOn')}
                style={{ backgroundColor: '#0fc0fc' }}
              >
                Date
              </button>
            </th>

            <th>
              <button
                type="button"
                onClick={() => requestSort('rating')}
                className={getClassNamesFor('rating')}
                style={{ backgroundColor: '#0fc0fc' }}
              >
                Rating
              </button>
            </th>
          </tr>
        </tr>
      </thead>

      <tbody>
        <Grid container direction="column" spacing={2}>
          {items.map((post) => {
            post.rating =
              (post.likedBy?.length || 0) - (post.dislikedBy?.length || 0);

            if (search) {
              return post.title.includes(search) ? (
                <Grid key={post.id} item>
                  <TopicRow key={post.id} row={post} />
                </Grid>
              ) : null;
            }

            return (
              <Grid key={post.id} item>
                <TopicRow key={post.id} row={post} />
              </Grid>
            );
          })}
        </Grid>
      </tbody>
    </table>
  );
};
export default Sort;

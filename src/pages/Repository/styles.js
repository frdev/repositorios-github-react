import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssuesList = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    & + li {
      margin-top: 10px;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      margin-left: 15px;
      flex: 1;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border: 1px solid #ccc;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const FilterButtons = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FilterButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.loading,
}))`
  flex: 1;
  height: 40px;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &.all {
    background-color: #7159c1;
  }
  &.closed {
    background-color: #3cb371;
  }
  &.open {
    background-color: #daa520;
  }
  & + button {
    margin-left: 10px;
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.9;
  }
`;

export const Pagination = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonPagination = styled.button.attrs(props => ({
  type: 'button',
  disabled:
    (props.firstButton && props.page === 1) ||
    (props.lastButton && props.page >= props.allPages),
}))`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  background: #7159c1;
  color: #fff;
  height: 30px;
  & + button {
    margin-left: 10px;
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.9;
  }
`;

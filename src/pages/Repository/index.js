import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssuesList,
  FilterButtons,
  FilterButton,
  Pagination,
  ButtonPagination,
} from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ repository: PropTypes.string }),
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    loading: true,
    loadingIssues: false,
    status: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match, location } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const qs = queryString.parse(location.search);
    if (qs.state) this.setState({ status: qs.state });
    if (qs.page) this.setState({ page: Number(qs.page) });

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.pIssues(repoName),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  pIssues(repoName) {
    const { history } = this.props;
    const { status, page } = this.state;

    // eslint-disable-next-line react/prop-types
    history.push({
      search: `?state=${status}&page=${page}`,
    });

    return api.get(`/repos/${repoName}/issues`, {
      params: {
        state: status,
        page,
        per_page: 5,
      },
    });
  }

  async handleStatus(status) {
    const { repository } = this.state;

    this.setState({ status, page: 1, loadingIssues: true });

    const issues = await this.pIssues(repository.full_name);

    this.setState({ issues: issues.data, loadingIssues: false });
  }

  async handlePage(page) {
    const { repository } = this.state;

    this.setState({ page, loadingIssues: true });

    const issues = await this.pIssues(repository.full_name);

    this.setState({ issues: issues.data, loadingIssues: false });
  }

  render() {
    const { repository, issues, loading, loadingIssues, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar para página inicial</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <FilterButtons>
          <FilterButton
            className="all"
            onClick={() => this.handleStatus('all')}
            loading={loadingIssues}
          >
            TODOS
          </FilterButton>
          <FilterButton
            className="open"
            onClick={() => this.handleStatus('open')}
            loading={loadingIssues}
          >
            ABERTOS
          </FilterButton>
          <FilterButton
            className="closed"
            onClick={() => this.handleStatus('closed')}
            loading={loadingIssues}
          >
            FECHADOS
          </FilterButton>
        </FilterButtons>

        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>

        <Pagination>
          <ButtonPagination
            onClick={() => this.handlePage(page - 1)}
            firstButton
            page={page}
            allPages={repository.open_issues}
          >
            <FaChevronLeft color="#FFF" size={14} />
          </ButtonPagination>
          <ButtonPagination
            onClick={() => this.handlePage(page + 1)}
            lastButton
            page={page}
            allPages={repository.open_issues}
          >
            <FaChevronRight color="#FFF" size={14} />
          </ButtonPagination>
        </Pagination>
      </Container>
    );
  }
}

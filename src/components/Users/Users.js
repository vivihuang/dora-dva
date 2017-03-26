import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Table, Pagination, Popconfirm } from 'antd'
import styles from './Users.css'
import { PAGE_SIZE } from '../../constants'

const Users = ({ dispatch, list: dataSource, total, page: current, loading }) => {
  const deleteHandler = (id) => {
    console.warn(`TODO: ${id}`)
  }

  const pageChangeHandler = (page) => {
    dispatch(routerRedux.push({
      pathname: 'users',
      query: { page }
    }))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href=''>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, { id }) => (
        <span className={styles.operation}>
          <a href=''>Edit</a>
          <Popconfirm title='Confirm to delete?' onConfirm={deleteHandler.bind(null, id)}>
            <a href=''>Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <div className={styles.normal}>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className='ant-table-pagination'
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { list, total, page } = state.users
  const { models: { users } } = state.loading
  return {
    list,
    total,
    page,
    loading: users
  }
}

export default connect(mapStateToProps)(Users)

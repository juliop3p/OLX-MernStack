import React from 'react'

export default function Error({ error }) {
    return (
        <p className="alert alert-warning text-center">
            {error}
        </p>
    )
}
